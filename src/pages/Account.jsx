import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Row mb="3rem">
        <h3>Update user data</h3>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <h3>Update password</h3>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
