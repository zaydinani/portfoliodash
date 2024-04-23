//my styles
import "../../styles/auth.scss";
import Link from 'next/link';
import data from "../../data/data.json"

function Auth() {
    
    return(
        <main>
            <div className="auth_container">
                <img src={data['zayd-data'].about.logo} alt="" />
                <form>
                    <input className="input" name="user_name" type="text" placeholder="Enter your name"  required/>
                    <input className="input" name="password" type="password" placeholder="Enter your passoword"  required/>
                    <input className="input" name="password" type="password" placeholder="confirm your passoword"  required/>
                    <button type="submit">Sign up</button>
                    <p className="writing">Or Sign In <Link href="/">here</Link></p>

                </form>
            </div>
        </main>

    )
}
export default Auth;
