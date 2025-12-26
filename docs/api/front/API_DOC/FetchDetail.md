# 📚 Документация API Details

## 🔗 Базовый URL: `/{INN}/`

## 📋 Методы API:

### **addDetailForOrder**
- **URL**: `/{INN}/detail/new`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `data: TNewDetailDTO` 🔧, `dataGeo: TNewDataGeoLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **removeDetailForOrder**
- **URL**: `/{INN}/detail/remove`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `idOrder: string` 📦, `idDetail: string` 🔧, `dataGeo: TNewDataGeoLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **getDetailByIdOrder**
- **URL**: `/{INN}/detail/get?idOrder={idOrder}`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢, `idOrder: string` 📦
- **Выходные данные**: `Promise<TDetailDTO[]>`

### **getDetailFromOrderWithDeleted**
- **URL**: `/{INN}/detail/getAll?idOrder={idOrder}`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢, `idOrder: string` 📦
- **Выходные данные**: `Promise<TDetailDTO[]>`

### **restoreDetail**
- **URL**: `/{INN}/detail/restore`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `idOrder: string` 📦, `idDetail: string` 🔧, `dataGeo: TNewDataGeoLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **searchDetail**
- **URL**: `/{INN}/detail/search?req={req}`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢, `req: string` 🔍
- **Выходные данные**: `Promise<TFullInfoTDetailDTO[]>`

### **updateDataDetail**
- **URL**: `/{INN}/detail/update`
- **Метод**: `PUT`
- **Входные данные**: `INN: string` 🟢, `data: TDetailDTO` 🔧, `dataGeo: TNewDataGeoLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **addFilesFromDetail**
- **URL**: `/{INN}/detail/{idDetail}/files/add`
- **Метод**: `PUT`
- **Входные данные**: `INN: string` 🟢, `idDetail: string` 🔧, `dataFiles: TResponseUploadFiles[]` 📁, `dataGeo: TNewDataGeoLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **removeFileFromDetail**
- **URL**: `/{INN}/detail/{idDetail}/files/remove`
- **Метод**: `PUT`
- **Входные данные**: `INN: string` 🟢, `idDetail: string` 🔧, `FullPath: string` 📁, `dataGeo: TNewDataGeoLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **addNewStep**
- **URL**: `/{INN}/detail/{idDetail}/addNewStep`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `idDetail: string` 🔧, `name: string` 📝, `dataGeo: TNewDataGeoLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **completedStepStatusDetail**
- **URL**: `/{INN}/detail/{idDetail}/completedStep`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `idDetail: string` 🔧, `name: string` 📝, `dataGeo: TNewDataGeoLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **completedDetail**
- **URL**: `/{INN}/detail/{idDetail}/completed`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `idDetail: string` 🔧, `idOrder: string` 📦, `dataGeo: TNewDataGeoLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

---

## 🎨 Легенда цветов:
- 🟢 `INN` параметры
- 🔵 `dataGeo: TNewDataGeoLocationDTO` геоданные
- 🔧 `TDetailDTO`, `TNewDetailDTO` данные деталей
- 📦 `idOrder` идентификатор заказа
- 📁 `TResponseUploadFiles`, `FullPath` файловые операции
- 🔍 `req` поисковый запрос
- 📝 `name` название шага/операции

