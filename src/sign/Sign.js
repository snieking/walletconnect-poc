import { useAccount } from 'wagmi';
import { SignMessage } from './SignMessage';

function Sign() {
  const { isConnected } = useAccount();
  console.log('Connected: ', isConnected);

  if (!isConnected) return null;

  return (
    <div>
      <h1>Sign</h1>
      <SignMessage />
    </div>
  );
}

export default Sign;
