import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './assets/sidebar.tsx';
//import AppNavbar from './assets/Navbar.tsx';
import { ThemeProvider } from './assets/ThemeContext.tsx';
import DashboardPage from './pages/Dashboard.tsx';
import GroupPage from './pages/groupPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import ProfilePage from './pages/profilePage.tsx';
import ToDoPage from './pages/ToDoPage.tsx';

function App() {
  return (
      <ThemeProvider>

          <Routes>
              <Route path="/" element={<LoginPage />} />

              <Route
                  path="/dashboard"
                  element={<DashboardPage />}
              />

              <Route
                  path="/todo"
                  element={<ToDoPage />}
              />

              <Route
                  path="/group"
                  element={<GroupPage />}
              />

              <Route
                  path="/profile"
                  element={<ProfilePage />}
              />
          </Routes>

          <Sidebar />

      </ThemeProvider>
  );
}
  

export default App
