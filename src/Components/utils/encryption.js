import CryptoJS from "crypto-js";

const enc_secret_key = process.env.REACT_APP_API_BASE_URL; 
const dec_secret_key = process.env.REACT_APP_API_BASE_URL; 

export const encryptData = async (data) => {
  try {
    const iv = CryptoJS.lib.WordArray.random(16);
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      enc_secret_key,
      { iv: iv }
    ).toString();
    return ciphertext;
  } catch (err) {
    throw err;
  }
};

export const decryptData = (encryptedData) => {
  try { 
    const bytes = CryptoJS.AES.decrypt(encryptedData, dec_secret_key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);     
    return decryptedData;
  } catch (err) {
    throw err;
  }
};
