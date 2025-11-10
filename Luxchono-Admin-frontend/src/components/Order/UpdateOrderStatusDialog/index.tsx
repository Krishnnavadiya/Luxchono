import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Buttons from "../../common/Buttons";
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { ReactSelectStyle } from '../../common/Selects/ReactSelect';
import Loader from '../../common/Loader';
import { EditStatusOption } from '../../../constants/Array';
export default function UpdateOrderStatusDialog({ open, onClose, yesClass, closeClass, tital, textClose, textYes, selectedValues, setSelectedValues, Action, loading, defaultUpdateStatus, optionValue }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [disabledBtton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (optionValue?.value !== selectedValues?.value) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }, [selectedValues, optionValue])


  const handleSelectChange = (selectedOptions: any) => {
    setSelectedValues(selectedOptions);
  };

  return (
    <Dialog className="UpdateDialog" open={open} >
      <Box className="flex flex-col items-center  w-full " >
        <DialogTitle className='!mt-[7px]' >
          <span className='!font-bold !text-[22px]'>
            {tital}
          </span>
        </DialogTitle>

        <div className='mb-[20px]' style={{ height: isMenuOpen ? '32vh' : 'auto' }}>
          <Select
            value={selectedValues}
            onChange={handleSelectChange}
            options={EditStatusOption}
            styles={ReactSelectStyle("350px", "45px")}
            isClearable={false}
            closeMenuOnSelect={true}
            onMenuClose={() => setIsMenuOpen(false)}
            onMenuOpen={() => setIsMenuOpen(true)}
            menuIsOpen={isMenuOpen}
            placeholder={"Select Order Status"}
          />

        </div>

        <DialogActions >

          {loading ? <Loader /> : (
            <Box className="!flex !gap-[8px] mt-[0.5rem]">
              <Buttons text={textClose} className={closeClass} variant={"outlined"} onClick={onClose} />
              <Buttons disabled={disabledBtton} text={textYes} className={yesClass} variant={"contained"} onClick={Action} />
            </Box>
          )}

        </DialogActions>
      </Box>
    </Dialog>
  )
}
