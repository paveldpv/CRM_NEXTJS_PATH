## Документация API Price (Прайс-листы)

## 🔗 Базовый URL: `/{INN}/`

## 📋 Методы API:

### **getPriceById**

- **URL**: `/{INN}/price/get?_id={id}&phone={phone?}`
    
- **Метод**: `GET`
    
- **Входные данные**: `INN: string` 🟢, `_id: string` 📊, `phone?: string` 📱
    
- **Выходные данные**: `Promise<TPriceDTO>`
    

### **getListInfoPrices**

- **URL**: `/{INN}/price/getList`
    
- **Метод**: `GET`
    
- **Входные данные**: `INN: string` 🟢
    
- **Выходные данные**: `Promise<TLink[]>`
    

### **addNewPrice**

- **URL**: `/{INN}/price/create`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `nameTable: string` 📝, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<TDataTablePriceDTO>`
    

### **updatePrice**

- **URL**: `/{INN}/price/update`
    
- **Метод**: `PUT`
    
- **Входные данные**: `INN: string` 🟢, `dataTable: TDataTablePriceDTO` 📊, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **deletedPrice** 🚨

- **URL**: `/{INN}/price/deleted?_id={id}`
    
- **Метод**:  `POST` ✅
    
- **Входные данные**: `INN: string` 🟢, `_id: string` 📊, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **renamePrice**

- **URL**: `/{INN}/price/rename`
    
- **Метод**: `PUT`
    
- **Входные данные**: `INN: string` 🟢, `newName: string` 📝, `_id: string` 📊, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

---

## 🎨 Легенда цветов:

- 🟢 `INN` параметры
    
- 🔵 `dataGeo: TNewDataGeoLocationDTO` геоданные
    
- 📊 `_id`, `dataTable` данные таблицы
    
- 📝 `nameTable`, `newName` названия таблиц
    
- 📱 `phone` параметр телефона (опционально)