const Notification = ({ message, success }) => {
  if (message === null) {
    return null;
  }

  return <div className={success ? 'successMessage' : 'errorMessage'}>{message}</div>;
};

export default Notification;
