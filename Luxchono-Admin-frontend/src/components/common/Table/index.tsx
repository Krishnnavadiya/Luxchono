import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import './style.scss'
import Loader from '../Loader';
import { STRING } from '../../../constants/String';
import { useEffect } from 'react'
import { AdminRow, BrandRow, CategoryRow, CustomerRow, OfferRow, OrdersRow, ProductRow, RatingRow ,} from './TableRow';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//     const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }


function stableSort<T>(array: readonly T[] | null | undefined, comparator: (a: T, b: T) => number) {
    if (!array) {
        return [];
    }

    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props: any) {
    const { headCells } = props
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, Orders, Customer, Admin ,Rating } =
        props;
    const createSortHandler =
        (property: keyof any) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: '#fff' }} >
            <TableRow className='bg-header !h-[40px] ' >
                <TableCell padding="checkbox">
                    <Checkbox
                        disabled={Orders || Customer || Admin || Rating ? true : false}
                        disableRipple
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }} />
                </TableCell>
                {headCells.map((headCell: any) => (
                    <TableCell
                        padding="none"
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        align={"left"}
                        // padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            className='font-bold uppercase '
                            // active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function Tables({ headCells, rows, isFetching, search, getSelectedDeleteRows, Product, Category, selected, setSelected, handleDeleteOpen, Brand, Orders, handleUpdateOpenConfirmation, Customer, Offer, Admin ,Rating }: any) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof any>('productname');
    // const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //set select row for delete
    useEffect(() => {
        getSelectedDeleteRows(selected)
    }, [selected]);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof any,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            if (Array.isArray(rows)) {
                const newSelected = rows.map((n) => n.id as any);
                setSelected(newSelected);
            }
            return;
        }
        setSelected([]);
    };

    // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.checked) {
    //         const newSelected = rows?.map((n:any) => n.id as any) || [];
    //         setSelected(newSelected);
    //     } else {
    //         setSelected([]);
    //     }
    // };


    const handleClick = (event: React.MouseEvent<unknown>, id: string | number) => {
        const selectedIndex = selected.indexOf(id as number);
        let newSelected: readonly number[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id as number);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: number) => selected?.indexOf(id) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    return (
        <Box>
            <Paper className="table-pepar">
                <TableContainer className="table-container"  >
                    <Table
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected?.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows?.length}
                            headCells={headCells}
                            Orders={Orders}
                            Customer={Customer}
                            Admin={Admin}
                            Rating={Rating}
                        />

                        {isFetching ? (
                            <div className='table_loading'>
                                <Loader />
                            </div>
                        ) : (!isFetching && rows?.length <= 0 || !rows) || (rows?.length <= 0 && search || !rows) ? (
                            <Box className="table_loading !font-extrabold" >
                                {STRING.PRODUCT_NODATA_AVAILABLE}
                            </Box>
                        ) : (
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id as number);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer', fontWeight: "800" }}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    disabled={Orders || Customer || Admin || Rating ? true : false}
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    disableRipple
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }} />
                                            </TableCell>
                                            {Product && <ProductRow row={row} index={index} handleDeleteOpen={handleDeleteOpen} />}
                                            {Category && <CategoryRow row={row} index={index} handleDeleteOpen={handleDeleteOpen} />}
                                            {Brand && <BrandRow row={row} index={index} handleDeleteOpen={handleDeleteOpen} />}
                                            {Orders && <OrdersRow handleUpdateOpenConfirmation={handleUpdateOpenConfirmation} row={row} index={index} />}
                                            {Customer && <CustomerRow row={row} index={index} />}
                                            {Offer && <OfferRow row={row} index={index} handleDeleteOpen={handleDeleteOpen} />}
                                            {Admin && <AdminRow row={row} index={index} />}

                                            {Rating && <RatingRow row={row} index={index} />}

                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>

                {rows && (
                    <>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, { label: "All", value: rows?.length }]}
                            component="div"
                            count={rows?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage} />
                    </>
                )}
            </Paper>
        </Box>
    );
}
