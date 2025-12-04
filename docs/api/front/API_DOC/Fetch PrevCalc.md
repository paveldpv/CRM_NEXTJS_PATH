## Документация API PrevCalc (Предварительные расчеты)
## 📋 Методы API:

### **saveRequest**

- **URL**: `/{INN}/prevCalc/new`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `data: TRequestPrevCalc` 📊
    
- **Выходные данные**: `Promise<void>`
    

### **deletedRequest**

- **URL**: `/{INN}/prevCalc/deleted`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `idRequest: string` 📝, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **getRequestPrevCalc**

- **URL**: `/{INN}/prevCalc/get`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `option?: TOptionQuery<TRequestPrevCalc>` 🟠
    
- **Выходные данные**: `Promise<TDBRequestPrevCalcDTO[]>`
    

### **getFavoritePrevCalc**

- **URL**: `/{INN}/prevCalc/getFavorite`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `option?: TOptionQuery<TRequestPrevCalc>` 🟠
    
- **Выходные данные**: `Promise<TDBRequestPrevCalcDTO[]>`
    

### **setFavoritePrevCall**

- **URL**: `/{INN}/prevCalc/setFavorite`
    
- **Метод**: `PUT`
    
- **Входные данные**: `INN: string` 🟢, `payload: { idRequest: string; isFavorite: boolean }` ⭐, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **getDeletedRequest**

- **URL**: `/{INN}/prevCalc/get/deleted`
    
- **Метод**: `GET`
    
- **Входные данные**: `INN: string` 🟢
    
- **Выходные данные**: `Promise<TDBRequestPrevCalcDTO[]>`
    

### **restoreRequest**

- **URL**: `/{INN}/prevCalc/restore`
    
- **Метод**: `GET` 🚨
    
- **Входные данные**: `INN: string` 🟢, `idRequest: string` 📝, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **getNewRequest**

- **URL**: `/{INN}/prevCalc/get/new`
    
- **Метод**: `GET`
    
- **Входные данные**: `INN: string` 🟢
    
- **Выходные данные**: `Promise<TDBRequestPrevCalcDTO>`
    

### **setVerifiedRequest**

- **URL**: `/{INN}/prevCalc/set/verified`
    
- **Метод**: `PUT`
    
- **Входные данные**: `INN: string` 🟢, `idRequest: string` 📝, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **setVerifiedRequestMany**

- **URL**: `/{INN}/prevCalc/set/verifiedMany`
    
- **Метод**: `PUT`
    
- **Входные данные**: `INN: string` 🟢, `ids: string[]` 📝, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

---

## 🎨 Легенда цветов:

- 🟢 `INN` параметры
    
- 🔵 `dataGeo: TNewDataGeoLocationDTO` геоданные
    
- 📊 `TRequestPrevCalc` данные расчета
    
- 📝 `idRequest`, `ids` идентификаторы запросов
    
- 🟠 `TOptionQuery` опции запроса
    
- ⭐ `isFavorite` флаг избранного