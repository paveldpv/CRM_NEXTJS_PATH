# 📚 Документация API DaData

## 🔗 Базовый URL: `/{INN}/`

## 📋 Методы API:

### **updateDaData**
- **URL**: `/{INN}/daData/update`
- **Метод**: `POST`
- **Входные данные**: `INN: string` 🟢, `INNqueryOrganization: string`, `idQueryOrganization: string`, `dataGeo: TGeolLocationDTO` 🔵
- **Выходные данные**: `Promise<TDaDataOrganizationDTO>`

### **getDaDataByINN**
- **URL**: `/{INN}/daData/get/INN?INN={INNqueryOrganization}`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢, `INNqueryOrganization: string`
- **Выходные данные**: `Promise<TDaDataOrganizationDTO>`

### **getAllDaData**
- **URL**: `/{INN}/daData/get/all`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢
- **Выходные данные**: `Promise<TDaDataOrganizationDTO[]>`

### **getAllDaDataWithDeleted**
- **URL**: `/{INN}/daData/get/withDeleted`
- **Метод**: `GET`
- **Входные данные**: `INN: string` 🟢
- **Выходные данные**: `Promise<TDaDataOrganizationDTO[]>`

---

## 🎨 Легенда цветов:
- 🟢 `INN` параметры
- 🔵 `dataGeo: TGeolLocationDTO` и подобные

## 💡 Замечания:
1. В `updateDaData` передается `INN` и в URL и как параметр - возможно дублирование
2. В `getDaDataByINN` параметр `INN` в query string может конфликтовать с основным `INN` из пути
3. Consistent naming: все методы используют `daData` в URL

## 🚀 Идеи для улучшения:
1. Добавить метод для поиска по названию организации
2. Реализовать кэширование запросов к DaData
3. Добавить пагинацию для `getAllDaData`
4. Сделать batch запросы для нескольких INN одновременно