import { useState } from "react";
import styles from "./DialogWizard.module.css";

export interface DialogWizardProps<T> {
  isOpen: boolean;
  onClose: () => void;
  views: DialogWizardViewProps<T>[];
  submitButtonText: string;
  submitFunction: (data: T) => Promise<void | boolean>;
  data: T;
}

export interface DialogWizardViewProps<T> {
  title: string;
  view: React.ReactNode;
  validate: (data: T) => boolean;
}

const DialogWizard = <T,>({
  isOpen,
  onClose,
  views,
  submitButtonText,
  submitFunction,
  data,
}: DialogWizardProps<T>) => {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = ((currentStep + 1) / views.length) * 100;

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.dialogWizard}>
        <button onClick={onClose} className={styles.closeDialogButton}>
          &times;
        </button>

        <section className={styles.progressBarSection}>
          <div className={styles.steps}>
            {views.map((step, index) => (
              <button
                key={index}
                className={styles.step}
                style={{
                  color: index === currentStep ? "var(--primary-red)" : "grey",
                }}
                onClick={() => {
                  if (index > currentStep) {
                    if (views[currentStep].validate(data)) {
                      setCurrentStep(index);
                    }
                  } else {
                    setCurrentStep(index);
                  }
                }}
              >
                {step.title}
              </button>
            ))}
          </div>
          <div className={styles.progressBackground}>
            <div
              className={styles.progress}
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section className={styles.inputSection}>
          <div className={styles.viewContainer}>{views[currentStep].view}</div>
          {currentStep === views.length - 1 && (
            <button
              className={styles.createProductButton}
              onClick={() => {
                if (views[currentStep].validate(data)) {
                  submitFunction(data);
                }
              }}
            >
              {submitButtonText}
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default DialogWizard;
