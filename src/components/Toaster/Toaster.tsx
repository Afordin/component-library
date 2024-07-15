import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Content = string;
type ToastOptions = { content: Content; duration?: number };
export type Toast = Content | ToastOptions;

type ToastWithId = ToastOptions & { id: string };

type ToasterContext = { addToast: (toast: Toast) => void };

const ToasterContext = createContext<ToasterContext | null>(null);

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error(
      "`useToaster` needs to be used within a `Toaster`! You likely forgot to wrap your app in it."
    );
  }
  return context;
};

type ToasterProps = {
  children: React.ReactNode;
};

const DEFAULT_TOAST_OPTIONS = {
  content: "",
  duration: 3000,
} as const satisfies ToastOptions;

const buildToastOptionsWithId = (toast: Toast) => {
  if (typeof toast === "string") {
    return {
      ...DEFAULT_TOAST_OPTIONS,
      id: crypto.randomUUID(),
      content: toast,
    };
  }
  return { ...DEFAULT_TOAST_OPTIONS, ...toast, id: crypto.randomUUID() };
};

export const Toaster = ({ children }: ToasterProps) => {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);

  const addToast = (toast: Toast) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      buildToastOptionsWithId(toast),
    ]);
  };

  //** @TODO - useLatestRef */
  const removeToast = useCallback((toast: ToastWithId) => {
    setToasts((currentToasts) =>
      currentToasts.filter((currentToast) => currentToast.id !== toast.id)
    );
  }, []);

  return (
    <>
      <ToasterContext.Provider value={{ addToast }}>
        {children}
      </ToasterContext.Provider>

      <div className="fixed inset-0 w-screen h-screen p-4 flex flex-col gap-2 justify-end items-end pointer-events-none">
        {toasts
          .toReversed()
          .slice(0, 6)
          .map((toast) => {
            return <Toast key={toast.id} toast={toast} dismiss={removeToast} />;
          })}
      </div>
    </>
  );
};

type ToastProps = {
  toast: ToastWithId;
  dismiss: (toast: ToastWithId) => void;
};

const Toast = ({ toast, dismiss }: ToastProps) => {
  const { content, duration } = toast;

  const toastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const toastElement = toastRef.current;
      if (!toastElement) return;
      const animation = toastElement.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 250,
      });
      animation.addEventListener("finish", () => {
        dismiss(toast);
      });
      animation.play();
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dismiss, duration, toast]);

  return (
    <div
      ref={toastRef}
      role="alert"
      aria-live="polite"
      className="w-[200px] shadow-md py-2 px-4 bg-white rounded-md appear"
    >
      <span className="text-black">{content}</span>
    </div>
  );
};
