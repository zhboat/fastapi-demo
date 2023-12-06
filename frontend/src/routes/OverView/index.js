import { useEffect, useState } from "react";
import AuthAPI from "../../services/auth";
import ResetPasswordModal from "../../Components/Main/resetPassword";

function OverView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      const resp = await AuthAPI.getUser();
      if (!resp.verified) {
        setIsModalOpen(true);
      }
    }
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <h1>This is OverView</h1>

      <ResetPasswordModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        hideCancel={true}
      />
    </>
  );
}

export default OverView;
