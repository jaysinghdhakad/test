import "./App.css";
import {
  usePrivy,
  useDelegatedActions,
} from '@privy-io/react-auth';
import { useSolanaWallets } from '@privy-io/react-auth/solana';



function App() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const {createWallet, wallets} = useSolanaWallets(); // or useWallets()
  const {delegateWallet} = useDelegatedActions();

  if(authenticated && wallets[0] == undefined){ 
    createWallet()
  
  }

  const handleLogin = async () => {
    try {
      console.log("hereahfrkabvkdab")
      await login();
      // Additional logic after successful login can be added here
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


  const delegate = async() => {
    await delegateWallet({address: wallets[0].address, chainType: 'solana'}); // or chainType: 'ethereum'

  }

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* If the user is not authenticated, show a login button */}
        {/* If the user is authenticated, show the user object and a logout button */}
        {ready && authenticated ? (
          <div>
            <textarea
              readOnly
              value={JSON.stringify(user, null, 2)}
              style={{ width: "600px", height: "250px", borderRadius: "6px" }}
            />
            <br />
            <button onClick={delegate} style={{ marginTop: "20px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}>
              delegate wallet 
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} style={{padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}>Log In</button>
        )}
      </header>
    </div>
  );

  // return (
  //   <div>
  //     here we are
  //     </div>
  // )
}

export default App;
