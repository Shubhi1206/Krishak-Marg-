import MobileLoginForm from '../MobileLoginForm';

export default function MobileLoginFormExample() {
  return (
    <MobileLoginForm 
      onLoginSuccess={() => console.log('Login successful!')}
    />
  );
}