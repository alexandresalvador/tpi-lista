
import { onMounted, watch } from 'vue';
import { Storage } from '@capacitor/storage';

export interface User{
    nome: string;
    idade: string;
}

export function userProfile() {
    const USER_STORAGE = "profile";
    let user = {
        nome: "",
        idade: "",
    };
    const cacheUser = () => {
        Storage.set({
            key: USER_STORAGE,
            value: JSON.stringify(user)
        });
    };

    const saveProfile = async (user: User): Promise<User> => {
        Storage.set({
            key: USER_STORAGE,
            value: JSON.stringify(user)
        });
        return user;
    };

    const loadSaved = async () => {
      const userInStorage = await Storage.get({ key: USER_STORAGE });
      user = userInStorage.value 
         ? JSON.parse(userInStorage.value) 
         : {
            nome: "",
            idade: "",
         };
     };

  //   const deleteUser = async (photo:  UserPhoto) => {
  //      user.value = user.value.filter((p) => p.filepath !== photo.filepath);
//
  //      const filename = photo.filepath.substr(photo.filepath.lastIndexOf("/") + 1);
 //       await Filesystem.deleteFile({
  //          path: filename,
  //          directory: Directory.Data,
  //      });
  //  };



    onMounted(loadSaved);
    watch(user, cacheUser);
    return {
        user,
        saveProfile,
       // deleteUser,
    };
}

