import 'react-native-gesture-handler';
import { Redirect } from 'expo-router';

export default function Index() {
  // Always redirect to auth flow first
  // The auth layout will handle redirecting to dashboard if user is logged in
  return <Redirect href="/(auth)/" />;
} 