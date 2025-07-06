export function checkPassword(password, confirmPassword) {
    try {
        if (password.length < 8) {
            return { length: false, message: 'Password Length is weak' }
        }
        if (password !== confirmPassword){
            return { length: true, isEqual: false, message: 'Password does not match' }
        }
        return { length: true, isEqual: true }
    } catch (error) {
        console.log(error)
    }
}