import { Snackbar } from "@mobiscroll/react";

function SnackbarComponent({
  isSnackbarOpen,
  snackbarButton,
  handleSnackbarClose,
}) {
  return (
    <Snackbar
      isOpen={isSnackbarOpen}
      message="Event deleted"
      button={snackbarButton}
      onClose={handleSnackbarClose}
    />
  );
}

export default SnackbarComponent;
