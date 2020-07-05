import React, { memo, useCallback, useEffect, useState } from "react";
import Input from "../../components/Input";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { makeSelectBusiness, makeSelectPrinterOptions } from "../../../stores/business/selector";
import Icon from "../../components/Icon";
import { ICONS } from "../../../assets/images/icons";
import { setPrinterOptions } from "../OnlineOrders/actions";
import { remote } from "electron";
import Select from "../../components/Select";
import { englishNumberToPersianNumber, persianToEnglishNumber } from "../../../utils/helper";
import Switch from "../../components/Swtich";
import FactorModal from "./FactorModal";

function PrinterSettings({ options, _setPrinterOptions, business }) {
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [title, setTitle] = useState("");
  const [printers, setPrinters] = useState([]);
  const [modal, setModal] = useState(-1);
  useEffect(() => {
    setPhone(options.phone);
    setTitle(options.title);
    setWebsite(options.website);
    setPrinters(options.printers);
  }, [options]);

  const submitChanges = useCallback(
    (data) => {
      _setPrinterOptions({ ...options, ...data });
    },
    [options]
  );
  const addPrinter = useCallback(() => {
    submitChanges({
      printers: [
        ...printers,
        {
          id: printers.length ? printers[printers.length - 1].id + 1 : 1,
          title: `چاپگر ${englishNumberToPersianNumber(printers.length + 1)}`,
          device: "",
          isActive: true,
          copies: 1,
          factor: {},
        },
      ],
    });
  }, [printers]);
  return (
    <div className="overflow-auto pb-5" style={{ height: "calc(100% - 110px)" }}>
      <FactorModal
        save={submitChanges}
        index={modal}
        _onClose={() => setModal(-1)}
        business={business}
        printOptions={options}
      />
      <div className="u-border-radius-8 container px-0 container-shadow overflow-hidden u-mt-50">
        <div className="px-5 py-3">
          <div className="u-fontWeightBold u-text-black">اطلاعات اصلی روی فیش</div>
          <div className="u-fontMedium mt-1">
            اطلاعات زیر بر روی فیش‌های چاپی شما قرار خواهند گرفت.
          </div>
        </div>
        <div className="u-background-white px-60 py-5 overflow-auto">
          <Input
            value={phone}
            onChange={(phone) => {
              submitChanges({ phone });
            }}
            label="شماره تماس"
          />
          <Input
            value={title}
            onChange={(title) => {
              submitChanges({ title });
            }}
            label="عنوان رستوران"
          />
          <Input
            value={website}
            onChange={(website) => {
              submitChanges({ website });
            }}
            label="آدرس سایت"
          />
        </div>
      </div>
      <div className="u-border-radius-8 container px-0 container-shadow mt-5">
        <div className="px-5 py-3 d-flex justify-content-between align-items-center">
          <div className="u-fontWeightBold u-text-black">تنظیمات چاپگر</div>
          <div
            className="u-cursor-pointer u-background-primary-blue u-border-radius-4 d-inline-flex justify-content-center align-items-center pr-2 py-2 pl-3"
            onClick={addPrinter}>
            <Icon icon={ICONS.PLUS} color="white" className="ml-2" size={12} />
            <span className="u-fontWeightBold u-fontMedium u-text-white">افزودن چاپگر جدید</span>
          </div>
        </div>
        <div
          className="u-background-white p-5"
          style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
          {printers.map((p, index) => (
            <div
              className="flex-wrap d-flex"
              key={`printer-${p.id}`}
              style={{ marginTop: index === 0 ? 0 : 44 }}>
              <div className="d-flex justify-content-between col-6 align-items-center">
                <div className="u-text-black">فعالسازی</div>
                <Switch
                  isSwitchOn={printers[index].isActive}
                  toggleSwitch={() => {
                    let newPrinters = [...printers];
                    newPrinters[index] = {
                      ...newPrinters[index],
                      isActive: !printers[index].isActive,
                    };
                    submitChanges({ printers: newPrinters });
                  }}
                />
              </div>
              <div className="col-6 d-flex justify-content-end align-items-center">
                <Icon
                  className="u-cursor-pointer"
                  onClick={() => {
                    let newPrinters = [...printers];
                    newPrinters.splice(index, 1);
                    submitChanges({ printers: newPrinters });
                  }}
                  icon={ICONS.TRASH}
                  size={19}
                  width={24}
                  height={24}
                  color="#949c9f"
                />
              </div>
              <div className="col-6">
                <Input
                  value={printers[index].title}
                  onChange={(title) => {
                    let newPrinters = [...printers];
                    newPrinters[index] = { ...newPrinters[index], title };
                    submitChanges({ printers: newPrinters });
                  }}
                  label="عنوان چاپگر"
                />
              </div>
              <div className="col-6">
                <Select
                  inputData={{
                    label: "انتخاب چاپگر",
                    value: printers[index].device,
                  }}
                  options={remote
                    .getCurrentWebContents()
                    .getPrinters()
                    .map((printer) => ({ id: printer.name, text: printer.name }))}
                  selectOption={(option) => {
                    let newPrinters = [...printers];
                    newPrinters[index] = { ...newPrinters[index], device: option.text };
                    submitChanges({ printers: newPrinters });
                  }}
                />
              </div>
              <div className="col-6">
                <Input
                  value={englishNumberToPersianNumber(printers[index].copies)}
                  onChange={(copies) => {
                    let newPrinters = [...printers];
                    newPrinters[index] = {
                      ...newPrinters[index],
                      copies: +persianToEnglishNumber(copies),
                    };
                    submitChanges({ printers: newPrinters });
                  }}
                  label="تعداد چاپ"
                />
              </div>
              <div
                className="u-text-primary-blue u-cursor-pointer col-12 mt-2"
                onClick={() => setModal(index)}>
                پیش‌نمایش و تنظیم اطلاعات روی فیش
                <Icon icon={ICONS.CHEVRON} color="#168fd5" size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  options: makeSelectPrinterOptions(),
  business: makeSelectBusiness(),
});
function mapDispatchToProps(dispatch) {
  return {
    _setPrinterOptions: (data) => dispatch(setPrinterOptions(data)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter, memo)(PrinterSettings);
