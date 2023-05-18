import axios from "axios";
import { useEffect, useState } from "react";
import "./Form.scss";

interface DetailedItem {
  type: string;
  label: string;
  value: string | number;
  required?: boolean;
  symbol?: string;
  precision?: number;
}

interface Item {
  type: string;
  header: string;
  columns: number;
  items: DetailedItem[];
}

interface FormData {
  id: number;
  name: string;
  type: string;
  items: Item[];
}

interface FormProps {
  handleCloseModal: () => void;
}

export const Form = ({ handleCloseModal }: FormProps) => {
  const [formData, setFormData] = useState<FormData[]>([]);

  useEffect(() => {
    axios.get<FormData[]>("http://localhost:3000/widgets").then(({ data }) => {
      setFormData(data);
    });
  }, []);


  return (
    <>
      <div className="form__container">
        <div className="form__header">
          <span className="form__btn--cancel" onClick={handleCloseModal}>
            Cancel
          </span>
          <div>
            {formData.map((form) => (
              <h3 key={form.id} className="form__title">
                {form.name}
              </h3>
            ))}
          </div>
          <span className="form__btn--save">Save</span>
        </div>

        <section className="form__section">
          {formData.map((form) => {
            return (
              <div key={form.id}>
                {form.items.map((item) => {
                  return (
                    <div key={Math.random()} className="form__section--header">
                      {item.header}
                    </div>
                  );
                })}
              </div>
            );
          })}

          <div className="form__section--inputs">
            <div className="form__input--container">
              <div>
                {formData.map((form) => (
                  <div key={form.id}>
                    {form.items.map((item) => (
                      <div key={Math.random()}>
                        {item.items.map((detailed) => (
                          <div key={Math.random()}>
                            <label className="form__input--label">
                              {detailed.label}
                              <input
                                className="input"
                                value={
                                  detailed.type === "currency" && detailed.precision
                                    ? detailed.symbol + ' ' + Number(detailed.value).toFixed(detailed.precision)
                                    : detailed.type === "currency" ? 
                                    detailed.symbol + ' ' + detailed.value
                                    : detailed.value
                                }
                                readOnly
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="form__input--container">
              <label className="form__input--label">
                Stage + Probability (%)
                <div className="label__multiple-inputs">
                  <input
                    className="input input-left"
                    value="Proposal/Price Quote"
                    readOnly
                  />
                  <input className="input input-right" type="number" />
                </div>
              </label>

              <label className="form__input--label">
                Choose Date
                <input className="input" type="date" />
              </label>
            </div>
          </div>
        </section>

        <section className="form__section">
          <div className="form__section--header">Additional Information</div>

          <div className="form__section--inputs">
            <div className="form__input--container">
              <label className="form__input--label">
                Opportunity Owner
                <input className="input" value="Dolores G. Smith" readOnly />
              </label>
            </div>
            <div className="form__input--container">
              <label className="form__input--label">
                Type
                <input className="input" value="New Customer" readOnly />
              </label>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
