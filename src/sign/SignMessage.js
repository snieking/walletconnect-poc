import * as React from 'react';
import { useSignMessage } from 'wagmi';
import { verifyMessage } from 'ethers/lib/utils';

export function SignMessage() {
  const recoveredAddress = React.useRef();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });
  const searchParams = new URLSearchParams(document.location.search);

  const prepareMessage = () => {
    const pubkey = searchParams.get('pubkey');
    const timestamp = Date.now();
    const app = 'MNA';
    return `${app}#${pubkey}@${timestamp}`;
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const message = prepareMessage();
        console.log('message', message);
        signMessage({ message });
      }}
    >
      <button disabled={isLoading}>
        {isLoading ? 'Check Wallet' : 'Sign Message'}
      </button>

      {data && (
        <div>
          <div>Recovered Address: {recoveredAddress.current}</div>
          <div>Signature: {data}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </form>
  );
}
