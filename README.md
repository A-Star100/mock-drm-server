# mock-drm-server
A Node.js server example that uses OpenSSL within a child process to decrypt an encrypted video and serve it to the user on-the-fly,
serving as a mock DRM setup similar to [ClearKey](https://github.com/Dash-Industry-Forum/ClearKey-Content-Protection) but simplified and only serving for encryption
and decryption.

## Setup
First, get a video file from anywhere you want. If OpenSSL isn't installed on your device, [install it from here](https://github.com/openssl/openssl).

Then, encrypt it with OpenSSL like this: 

```shell
openssl enc -aes-256-cbc -salt -pbkdf2 -in video.mp4 -out video.mp4.enc -pass pass:password123
```
*This command uses the AES-256 encryption standard in CBC mode with PBKDF2 (for password-based key derivation, more secure), 
uses a salt to add randomness to the encryption instead of producing the same encrypted value every time, and the obvious*.

To decrypt it to a file in the filesystem instead of memory like on the server when you need to, use:

```shell
openssl enc -aes-256-cbc -d -pbkdf2 -in video.mp4.enc -out video.mp4 -pass pass:password123
```
*This command uses the same standards as the above but dynamically reads the salted encrypted value for decryption instead of using a flag to specify that it's salted*.

## WebCrypto
While [WebCrypto](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) isn't viable for large video files (mostly for small text files),
it can be used to encrypt and decrypt extremely compressed media files (<1MB).

