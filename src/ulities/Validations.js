import axiosCilent from '../api/axiosClient';

const handleEmailRepeat = async (email) => {
    const listUser = await axiosCilent.get('/zola/users');
    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].email === email) {
            return 'Email đã tồn tại!';
        }
    }
    return true;
};

const isEmail = async (stringEmail, standard) => {
    if (stringEmail.length === 0) {
        return 'Email không được để trống!';
    } else {
        if (standard.test(stringEmail) === false) {
            return 'Email không đúng định dạng!';
        } else {
            let result = await handleEmailRepeat(stringEmail);
            return result;
        }
    }
};

const isFullName = (stringFullName, standard) => {
    if (stringFullName.length === 0) {
        return 'Họ tên không được để trống!';
    } else {
        if (standard.test(stringFullName) === false) {
            return 'Họ và tên không bao gồm chữ số, kí tự đặc biệt và tối đa 30 kí tự';
        } else {
            return true;
        }
    }
};

const handleUsernameRepeat = async (username) => {
    const listUser = await axiosCilent.get('/zola/users');

    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].username === username) {
            return 'Username đã tồn tại!';
        }
    }
    return true;
};
const isUsername = async (stringUsername, standard) => {
    if (stringUsername.length === 0) {
        return 'Username không được để trống!';
    } else {
        if (standard.test(stringUsername) === false) {
            return 'Username từ 3 kí tự trở lên';
        } else {
            let result = await handleUsernameRepeat(stringUsername);
            return result;
        }
    }
};
const isPassword = (stringPass, standard) => {
    if (stringPass.length === 0) {
        return 'Mật khẩu không được để trống!';
    } else {
        //let temp = new RegExp(standard);
        if (standard.test(stringPass) === false) {
            return 'Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự.';
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

export { isEmail, isPassword, isUsername, isRePassword, isFullName };
