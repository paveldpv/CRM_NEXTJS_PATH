# 📚 Документация API Counterparty

## 🔗 Базовый URL: `/{INN}/`

## 📋 Методы API:

### **createCounterparty**
- **URL**: `/{INN}/counterparty/create`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `data: TNewDataCounterparty` 🟣, `dataGeo: TGeolLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **updateCounterparty**
- **URL**: `/{INN}/counterparty/update`
- **Метод**: `PUT`
- **Входные данные**: `INN: string` 🟢, `data: TCounterpartyDTO` 🟣, `dataGeo: TGeolLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **deletedCounterparty**
- **URL**: `/{INN}/counterparty/remove/{_id}`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `_id: string`, `dataGeo: TGeolLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **getAllCounterparty**
- **URL**: `/{INN}/counterparty/all`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `option?: TOptionQuery<TCounterparty>` 🟠
- **Выходные данные**: `Promise<TCounterpartyDTO[]>`

### **getAllCounterpartyWithDeleted**
- **URL**: `/{INN}/counterparty/allWithDeleted`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `option?: TOptionQuery<TCounterparty>` 🟠
- **Выходные данные**: `Promise<TCounterpartyDTO[]>`

### **deletedFileRequitesCounterparty**
- **URL**: `/{INN}/counterparty/file/remove/{_id}`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `_id: string`, `file: TResponseUploadFiles` 📁, `dataGeo: TGeolLocationDTO` 🔵
- **Выходные данные**: `Promise<void>`

### **searchCounterparty**
- **URL**: `/{INN}/counterparty/query?query={query}&withDeleted={withDeleted}`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢, `query: string`, `withDeleted: boolean`
- **Выходные данные**: `Promise<TCounterpartyDTO[] | null>`

---

## 🎨 Легенда цветов:
- 🟢 `INN` параметры
- 🟠 `TOptionQuery` типы
- 🔵 `dataGeo: TGeolLocationDTO` и подобные
- 🟣 `TCounterpartyDTO` и `TNewDataCounterparty` данные контрагента
- 📁 `TResponseUploadFiles` файловые операции

