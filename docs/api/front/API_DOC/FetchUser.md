# 📚 Документация API Users

## 🔗 Базовый URL: `/{INN}/`

## 📋 Методы API:

### **getAllUsers**
- **URL**: `/{INN}/users/all`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `optionQuery: TOptionQuery<TUserDTOWithoutPas>` 🟠
- **Выходные данные**: `Promise<TUserDTOWithoutPas[] | []>`

### **getAllUsersWithoutDeleted**
- **URL**: `/{INN}/users/withoutDeleted`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `optionQuery: TOptionQuery<TUserDTOWithoutPas>` 🟠
- **Выходные данные**: `Promise<TUserDTOWithoutPas[]>`

### **getDataAdmins**
- **URL**: `/{INN}/users/admins`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢
- **Выходные данные**: `Promise<TUserDTOWithoutPas[]>`

### **getUserById**
- **URL**: `/{INN}/user/id?id={_id}`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢, `_id: string`
- **Выходные данные**: `Promise<TUserDTOWithoutPas>`

### **getUserByPhone**
- **URL**: `/{INN}/user/phone?phone={phone}`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢, `phone: string`
- **Выходные данные**: `Promise<TUserDTOWithoutPas>`

### **getUserByGroupID**
- **URL**: `/{INN}/users/batch?ids={id1!id2!id3}`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢, `list_id: string[]`
- **Выходные данные**: `Promise<TUserDTOWithoutPas[]>`

### **getUsersWithBirthdayToday**
- **URL**: `/{INN}/users/batch/birthday`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢
- **Выходные данные**: `Promise<TUserDTOByBirthday[]>`

### **addNewUser**
- **URL**: `/{INN}/user/newUser`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `newUser: TNewUser`, `dataGeo: TGeolLocationDTO` 🔵
- **Выходные данные**: `Promise<TUserDTOWithoutPas>`

### **updateDataUser**
- **URL**: `/{INN}/user/update/data`
- **Метод**: `PUT`
- **Входные данные**: `INN: string` 🟢, `newDataUser: TUserDTOWithoutPas`, `dataGeo: TGeolLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **updatePass**
- **URL**: `/{INN}/user/update/password`
- **Метод**: `PUT`
- **Входные данные**: `INN: string` 🟢, `data: { idUser: string, newPas: string }`, `dataGeo: TGeolLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **removeUser**
- **URL**: `/{INN}/user/remove/{_id}`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `_id: string`, `dataGeo: TGeolLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **restoreUser**
- **URL**: `/{INN}/user/restore/{_id}`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `_id: string`, `dataGeo: TGeolLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

---

## 🎨 Легенда цветов:
- 🟢 `INN` параметры
- 🟠 `TOptionQuery` типы  
- 🔵 `dataGeo: TGeolLocationDTO` и подобные

