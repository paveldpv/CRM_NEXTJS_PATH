## 📚 Документация API Orders

## 🔗 Базовый URL: `/{INN}/`

## 📋 Методы API:

### **createOrder**

- **URL**: `/{INN}/order/create`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `data: TNewOrderDTO` 📦, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<TOrderFullInfoDTO>`
    

### **restoreOrder**

- **URL**: `/{INN}/order/restore`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `idOrder: string` 📦, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **removeOrder**

- **URL**: `/{INN}/order/remove`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `idOrder: string` 📦, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **getOrders**

- **URL**: `/{INN}/order/get`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `deleted: boolean` 🗑️, `completed: boolean` ✅, `option: TOptionQuery<TOrder>` 🟠
    
- **Выходные данные**: `Promise<TOrderFullInfoDTO[]>`
    

### **searchOrderByDate**

- **URL**: `/{INN}/order/search?dateStart={date}&dateEnd={date}`
    
- **Метод**: `GET`
    
- **Входные данные**: `INN: string` 🟢, `dateStart: Date` 📅, `dateEndDate: Date` 📅
    
- **Выходные данные**: `Promise<TOrderFullInfoDTO[]>`
    

### **updateOrder**

- **URL**: `/{INN}/order/update`
    
- **Метод**: `PUT`
    
- **Входные данные**: `INN: string` 🟢, `data: TOrderFullInfoDTO` 📦, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **completedOrder**

- **URL**: `/{INN}/order/competed` 🚨
    
- **Метод**: `PUT`
    
- **Входные данные**: `INN: string` 🟢, `idOrder: string` 📦, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

---

## 🎨 Легенда цветов:

- 🟢 `INN` параметры
    
- 🔵 `dataGeo: TNewDataGeoLocationDTO` геоданные
    
- 📦 `TOrderFullInfoDTO`, `TNewOrderDTO` данные заказов
    
- 🗑️ `deleted` фильтр удаленных
    
- ✅ `completed` фильтр завершенных
    
- 🟠 `TOptionQuery` опции запроса
    
- 📅 `Date` параметры дат