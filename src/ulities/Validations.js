const isEmail = (stringEmail, standard) => {
    if (stringEmail.length === 0) {
        return 'Email không được để trống!';
    } else {
        let temp = new RegExp(standard);
        if (standard.test(stringEmail) === false) {
            return 'Email không đúng định dạng!';
        } else {
            return true;
        }
    }
};
const isUsername = (stringUsername, standard) => {
    if (stringUsername.length === 0) {
        return 'Username không được để trống!';
    } else {
        let temp = new RegExp(standard);
        if (standard.test(stringUsername) === false) {
            return 'Username từ 3 kí tự trở lên';
        } else {
            return true;
        }
    }
};
const isPassword = (stringPass, standard) => {
    if (stringPass.length === 0) {
        return 'Mật khẩu không được để trống!';
    } else {
        let temp = new RegExp(standard);
        if (standard.test(stringPass) === false) {
            return 'Mật khẩu không đúng định dạng!';
        } else {
            return true;
        }
    }
};

const isRePassword = (stringPass, standard) => {
    if (stringPass.length === 0) {
        return 'Mật khẩu không được để trống!';
    } else {
        if (!(standard === stringPass)) {
            return 'Mật khẩu không trùng khớp!';
        } else {
            return true;
        }
    }
};

export { isEmail, isPassword, isUsername, isRePassword };
