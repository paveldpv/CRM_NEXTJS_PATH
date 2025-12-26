## 📚 Документация API PropertyDetail (Свойства деталей)

## 🔗 Базовый URL: `/{INN}/`

## 📋 Методы API:

### **addPropertyDetail**

- **URL**: `/{INN}/propertyDetail/add`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `property: string` 🔧, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **removePropertyDetail**

- **URL**: `/{INN}/propertyDetail/remove`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `idProperty: string` 🔧, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **getProperties**

- **URL**: `/{INN}/propertyDetail/get`
    
- **Метод**: `GET`
    
- **Входные данные**: `INN: string` 🟢
    
- **Выходные данные**: `Promise<TPropertyDetailDTO[]>`
    

### **searchProperties**

- **URL**: `/{INN}/propertyDetail/search?search={query}`
    
- **Метод**: `GET`
    
- **В입ные данные**: `INN: string` 🟢, `dataSearch: string` 🔍
    
- **Выходные данные**: `Promise<TPropertyDetailDTO[]>`
    

---

## 🎨 Легенда цветов:

- 🟢 `INN` параметры
    
- 🔵 `dataGeo: TNewDataGeoLocationDTO` геоданные
    
- 🔧 `property`, `idProperty` данные свойств
    
- 🔍 `dataSearch` поисковый запрос