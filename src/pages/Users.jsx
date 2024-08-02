import Section from "../ui/Section";
import SignupForm from "../features/authentication/SignupForm";

function Users() {
  return (
    <Section>
      <h2>Add new users</h2>
      <SignupForm />
    </Section>
  );
}

export default Users;
