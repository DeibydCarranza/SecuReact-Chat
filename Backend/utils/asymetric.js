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

export function signature(message, privateKey) {
	console.log("message - signature",message)
	const sign = crypto.sign(
    'sha256',
    Buffer.from(message, 'utf8'),
    {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
    }
	);
	return sign;
}

export function validate_sign(message, sign, publicKey){
	const isVerified = crypto.verify(
    'sha256',
    Buffer.from(message, 'utf8'),
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
    },
    sign
	);
	return isVerified;
}


export function decrypt (message,secret){
	var bytes=CryptoJS.AES.decrypt(message,secret);
	message=bytes.toString(CryptoJS.enc.Utf8);
	return message;
};

