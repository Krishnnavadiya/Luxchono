import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

export const Loading = () => {
  const loading = useSelector((state) => {
    return state?.loadingReducer?.loading;
  });

  const isLoading = useSelector((state) => state.loder.isLoading);

  const styles = {
    margin: "auto",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
  };

  if (loading || isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0,0.4)",
          top: 0,
        }}
      >
        {(loading || isLoading) && (
          <div>
            <PulseLoader
              css={styles}
              margin={8}
              size={20}
              color={"#964315"}
              loading={loading || isLoading}
            />
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

const fallBackStyle = {
  height: "100vh",
};

export const MuiLoader = () => (
  <div
    className="d-flex justify-content-center align-items-center w-100"
    style={fallBackStyle}
  >
    <CircularProgress />
  </div>
);
