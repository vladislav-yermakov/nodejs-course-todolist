import crypto from 'crypto'

// https://stackoverflow.com/questions/50475641
function encryptRAW(input, algorithm, key, iv) {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(input, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
}

function decryptRAW(input, algorithm, key, iv) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let output = decipher.update(input, 'base64', 'utf8')
    output += decipher.final('utf8')
    return output
}

const algorithm = process.env.DB_CRYPTO_ALGO
const iv = Buffer.from(process.env.DB_CRYPTO_IV, 'hex')
const key = Buffer.from(process.env.DB_CRYPTO_KEY, 'hex')

function encrypt(input) {
    return encryptRAW(input, algorithm, key, iv)
}

function decrypt(input) {
    return decryptRAW(input, algorithm, key, iv)
}

function hash256(input) {
    // https://stackoverflow.com/questions/5878682
    return crypto.createHash('sha256').update(input).digest('hex')
}

export { encrypt, decrypt, hash256 }