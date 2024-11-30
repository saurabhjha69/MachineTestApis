import bcryptjs from "bcryptjs"

export const encryptPassword = (password) => {
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password,salt)
}

export const isPasswordRight = (unhasedPass,hasPass) => {
    return bcryptjs.compareSync(unhasedPass,hasPass)
}