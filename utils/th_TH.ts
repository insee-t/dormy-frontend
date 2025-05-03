import thTH from 'date-fns/locale/th';

const DateTimeFormats = {
  sunday: 'อา',
  monday: 'จ',
  tuesday: 'อ',
  wednesday: 'พ',
  thursday: 'พฤ',
  friday: 'ศ',
  saturday: 'ส',
  ok: 'ตกลง',
  today: 'วันนี้',
  yesterday: 'เมื่อวาน',
  now: 'ขณะนี้',
  hours: 'ชั่วโมง',
  minutes: 'นาที',
  seconds: 'วินาที',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'MMM dd, yyyy',
  shortDateFormat: 'MM/dd/yyyy',
  shortTimeFormat: 'hh:mm aa',
  dateLocale: thTH as any
};

const Combobox = {
  noResultsText: 'ไม่พบข้อมูล',
  placeholder: 'เลือก',
  searchPlaceholder: 'ค้นหา',
  checkAll: 'ทั้งหมด'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'รายการใหม่',
  createOption: 'สร้างตัวเลือก "{0}"'
};

export default {
  code: 'th-TH',
  common: {
    loading: 'กำลังโหลด...',
    emptyMessage: 'ไม่พบข้อมูล',
    remove: 'ลบ',
    clear: 'ล้าง'
  },
  Plaintext: {
    unfilled: 'ไม่ได้กรอก',
    notSelected: 'ไม่ได้เลือก',
    notUploaded: 'ไม่ได้อัปโหลด'
  },
  Pagination: {
    more: 'เพิ่มเติม',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    first: 'หน้าแรก',
    last: 'หน้าสุดท้าย',
    limit: '{0} / หน้า',
    total: 'รวมทั้งหมด: {0} แถว',
    skip: 'ไปที่{0}'
  },
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: '7 วันที่ผ่านมา'
  },
  Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'เริ่มต้น',
    progress: 'กำลังอัปโหลด',
    error: 'ข้อผิดพลาด',
    complete: 'เสร็จสิ้น',
    emptyFile: 'ไฟล์ว่าง',
    upload: 'อัปโหลด',
    removeFile: 'ลบไฟล์'
  },
  CloseButton: {
    closeLabel: 'ปิด'
  },
  Breadcrumb: {
    expandText: 'แสดงเส้นทาง'
  },
  Toggle: {
    on: 'เปิด',
    off: 'ปิด'
  }
};
