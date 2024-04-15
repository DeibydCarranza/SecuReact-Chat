import crypto from 'crypto'
import CryptoJS from "crypto-js"; 

export function generateKeyPair() {
	const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
		modulusLength: 2048,
		publicKeyEncoding: {
				type: 'spki',
				format: 'pem'
		},
		privateKeyEncoding: {
				type: 'pkcs8',
				format: 'pem'
		}
	});
  return { publicKey, privateKey };
}

export function signature(message, privateKey, secret) {
	const decrypted_message = decrypt(message,secret)
	// console.log("message - signature",message)
	const sign = crypto.sign(
    'sha256',
    Buffer.from(decrypted_message, 'utf8'),
    {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
    }
	);
	return sign;
}

export function validate_sign(message, sign, publicKey,secret){
	const decrypted_message = decrypt(message,secret)
	// console.log("mensage decrypted_message", decrypted_message)
	const isVerified = crypto.verify(
    'sha256',
    Buffer.from(decrypted_message, 'utf8'),
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
    },
    sign
	);
	return isVerified; // True or false
}


export function decrypt (message,secret){
	var bytes=CryptoJS.AES.decrypt(message,secret);
	message=bytes.toString(CryptoJS.enc.Utf8);
	return message;
};

