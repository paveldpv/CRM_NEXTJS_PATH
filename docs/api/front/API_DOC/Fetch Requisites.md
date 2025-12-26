##  Документация API Requisites (Реквизиты)

## 🔗 Базовый URL: `/{INN}/`

## 📋 Методы API:

### **getCurrentOrganizationRequisites**

- **URL**: `/{INN}/requisites/get/current`
    
- **Метод**: `GET`
    
- **Входные данные**: `INN: string` 🟢
    
- **Выходные данные**: `Promise<TRequisitesDTO>`
    

### **getAllCounterpartyRequisites**

- **URL**: `/{INN}/requisites/get/all`
    
- **Метод**: `GET`
    
- **Входные данные**: `INN: string` 🟢
    
- **Выходные данные**: `Promise<TRequisitesDTO[]>`
    

### **deleteRequisites**

- **URL**: `/{INN}/requisites/deleted?targetINN={targetINN}`
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `targetINN: string` 🎯, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

### **updateRequisites**

- **URL**: `/{INN}/requisites/update/all` 🚨
    
- **Метод**: `POST`
    
- **Входные данные**: `INN: string` 🟢, `data: TRequisitesDTO` 📄, `dataGeo: TNewDataGeoLocationDTO` 🔵
    
- **Выходные данные**: `Promise<void>`
    

---

## 🎨 Легенда цветов:

- 🟢 `INN` параметры (текущая организация)
    
- 🔵 `dataGeo: TNewDataGeoLocationDTO` геоданные
    
- 🎯 `targetINN` реквизиты какой организации удаляем
    
- 📄 `TRequisitesDTO` данные реквизитов