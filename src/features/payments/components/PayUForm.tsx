import { useEffect, useRef } from "react";
import type { PayURequest } from "../model";

const PayUForm = ({ payuRequest }: { payuRequest: PayURequest }) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.submit();
  }, []);

  const actionUrl = import.meta.env.VITE_PAYU_ACTION_URL;

  return (
    <form ref={formRef} method="post" action={actionUrl}>
      <input type="hidden" name="key" value={payuRequest.key} />
      <input type="hidden" name="txnid" value={payuRequest.txnid} />
      <input type="hidden" name="amount" value={payuRequest.amount} />
      <input type="hidden" name="productinfo" value={payuRequest.productinfo} />
      <input type="hidden" name="firstname" value={payuRequest.firstname} />
      <input type="hidden" name="email" value={payuRequest.email} />
      <input type="hidden" name="phone" value={payuRequest.phone} />
      <input type="hidden" name="surl" value={payuRequest.surl} />
      <input type="hidden" name="furl" value={payuRequest.furl} />
      <input type="hidden" name="hash" value={payuRequest.hash} />
    </form>
  );
};

export default PayUForm;
