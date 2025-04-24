# mock-drm-server
A Node.js server example that uses OpenSSL within a child process to decrypt an encrypted video and serve it to the user on-the-fly.

## Setup
First, get a video file from anywhere you want. If OpenSSL isn't installed on your device, [install it from here](https://github.com/openssl/openssl)
Then, encrypt it with OpenSSL like this: 

```shell
openssl enc -aes-256-cbc -salt -pbkdf2 -in video.mp4 -out video.mp4.enc -pass pass:password123
```

To decrypt it to a file in the filesystem instead of memory like on the server when you need to, use:

```shell
openssl enc -aes-256-cbc -d -pbkdf2 -in video.mp4.enc -out video.mp4 -pass pass:password123
```

