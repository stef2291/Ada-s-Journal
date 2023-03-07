/** Ada's Journal
 *
 * The App initially starts on the Login page, and redirects to register oor home page
 *
 * Home Page Has Cards with Published Journals (Everyone Has Access to them, only Admin can Edit or Delete)
 *
 * Another Page for Unpublished journals (Only Admin and Helpers Can Access or edit them)
 *
 * Another Page for Adding helper accounts and Removing Accounts (Only Admin Can Access)
 *
 * All Accounts should be able to update their passwords
 *
 * Write Tests!
 *
 * Steps:
 * Create Ada's Account and login/Authorization Page
 *
 * Register page should create user
 * Login page should redirect to home page
 *
 *
 * //// Questions: How to use jwt.verify once logged in?
 * //// How to create a react router for various pages
 * //// How to link backend with frontend (urls)
 */

import Login from "./components/Login";
import RegisterPage from "./components/Register";

function App() {
  return <RegisterPage />;
}

export default App;
