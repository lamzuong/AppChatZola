import axiosCilent from '../api/axiosClient';

const listUser = axiosCilent.get('/zola/users');

const isEmail = (stringEmail, standard) => {
    if (stringEmail.length === 0) {
        return 'Email không được để trống!';
    } else {
        if (standard.test(stringEmail) === false) {
            return 'Email không đúng định dạng!';
        } else {
            //const listUser = await axiosCilent.get('/zola/users');
            for (let i = 0; i < listUser.length; i++) {
                if (listUser[i].email === stringEmail) {
                    return 'Email đã tồn tại!';
                }
            }
        }
    }
    return true;
};

const isEmail2 = (stringEmail, standard) => {
    console.log(isEmail(stringEmail, standard));
    //return isEmail(stringEmail, standard);
};

const isFullName = (stringFullName, standard) => {
    if (stringFullName.length === 0) {
        return 'Họ tên không được để trống!';
    } else {
        if (standard.test(removeAscent(stringFullName)) === false) {
            return 'Họ và tên không bao gồm chữ số, kí tự đặc biệt và tối đa 30 kí tự';
        } else {
            return true;
        }
    }
};

function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
}

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

export { isEmail, isPassword, isUsername, isRePassword, isFullName, isEmail2 };
