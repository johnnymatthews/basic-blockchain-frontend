# Basic Blockchain Frontend

This is a basic frontend for a blockchain application built on the Aion network. All you need to get things up and running are:

1. A Node URL
2. A private key
3. A contract address

The script (`script.js`) looks for two methods:

- `getString`
- `setString`

By clicking on either of the buttons on the frontend, you'll be able to retrieve and set the string in a particular contract, assuming these two methods exist.

If you'd like to test things out, you can deploy the following contract, and then fill in the 3 variables mentioned above!

```java
package getset;
import org.aion.avm.tooling.abi.Callable;

public class HelloWorld
{
    private static String myStr = "Hello World";

    @Callable
    public static String getString() {
        return myStr;
    }

    @Callable
    public static void setString(String newStr) {
        myStr = newStr;
    }
}
```

If you want to use a copy of the above contract that's already been deployed, use this address: `0xa003cd11951f9a58f81df851e83cf7b5eca4b2ca5d6429dadb49021c13603357`

## Demo

There's a [live demo of this app available](https://basic-blockchain-frontend.netlify.com)kindly hosted for free by Netlify.
