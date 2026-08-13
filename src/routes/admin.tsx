import { ProtectedRoute } from '../components/ProtectedRoute';
import Admin from '../components/Admin';

export default function AdminRoute() {
  return (
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  );
}
