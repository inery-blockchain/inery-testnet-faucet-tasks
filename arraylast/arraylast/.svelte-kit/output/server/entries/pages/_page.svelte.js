import { c as create_ssr_component, d as add_attribute, e as escape, b as subscribe, i as is_promise, n as noop, v as validate_component } from "../../chunks/index.js";
import { w as writable } from "../../chunks/index3.js";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { modal_id } = $$props;
  let { modal_title } = $$props;
  let { action_button_class = "btn btn-primary" } = $$props;
  if ($$props.modal_id === void 0 && $$bindings.modal_id && modal_id !== void 0)
    $$bindings.modal_id(modal_id);
  if ($$props.modal_title === void 0 && $$bindings.modal_title && modal_title !== void 0)
    $$bindings.modal_title(modal_title);
  if ($$props.action_button_class === void 0 && $$bindings.action_button_class && action_button_class !== void 0)
    $$bindings.action_button_class(action_button_class);
  return `<input type="${"checkbox"}"${add_attribute("id", modal_id, 0)} class="${"modal-toggle"}">
<div class="${"modal modal-bottom sm:modal-middle"}"><div class="${"modal-box relative"}"><label${add_attribute("for", modal_id, 0)} class="${"btn btn-sm btn-circle absolute right-2 top-2"}">✕</label>
    <h3 class="${"font-bold text-lg mb-4"}">${escape(modal_title)}</h3>
    ${slots.body ? slots.body({}) : ``}
    <div class="${"modal-action"}"><label${add_attribute("for", modal_id, 0)}${add_attribute("class", action_button_class, 0)}>Submit</label></div></div></div>`;
});
const api_store = writable("Please run the button above...");
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $api_store, $$unsubscribe_api_store;
  $$unsubscribe_api_store = subscribe(api_store, (value) => $api_store = value);
  let create_id;
  let read_id;
  let update_id;
  let destroy_id;
  $$unsubscribe_api_store();
  return `<div class="${"container bg-base-200 mx-auto min-h-screen px-20 pb-20 pt-20"}"><div class="${"mb-10 text-center"}"><div class="${"text-4xl font-bold "}">Inery Simple CRUD DAPP</div>
        <div class="${"mt-4"}">Please click one of button below to run the blockchain transaction <br> after the transaction executed you will see a blockchain log in the bottom</div></div>

    <div class="${"grid grid-cols-4 gap-4"}"><label for="${"modal-create"}" class="${"btn btn-primary"}">Create</label>
        <label for="${"modal-read"}" class="${"btn btn-info"}">Read</label>
        <label for="${"modal-update"}" class="${"btn btn-primary"}">Update</label>
        <label for="${"modal-destroy"}" class="${"btn btn-error"}">Destroy</label></div>
    
    <div class="${"divider"}"></div>

    
    <div class="${"mockup-code"}">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
            <pre data-prefix="${"$"}"><code>Waiting your transaction to proceed on the blockchain..</code></pre>    
        `;
    }
    return function(api) {
      return ` 
            <pre data-prefix="${"$"}"><code>${escape(JSON.stringify(api, null, 4))}</code></pre>    
        `;
    }(__value);
  }($api_store)}</div></div>

${validate_component(Modal, "Modal").$$render(
    $$result,
    {
      modal_id: "modal-create",
      modal_title: "Create New Record on IneryDB"
    },
    {},
    {
      body: () => {
        return `<div slot="${"body"}" class="${"flex flex-col gap-4"}"><input type="${"text"}" placeholder="${"Type the ID..."}" class="${"input input-bordered w-full max-w-xs"}"${add_attribute("value", create_id, 0)}>
        <input type="${"text"}" placeholder="${"kimkhoathao"}" class="${"input input-bordered w-full max-w-xs"}" disabled>
        <textarea class="${"textarea textarea-bordered w-full"}" placeholder="${"Type the data..."}">${""}</textarea></div>`;
      }
    }
  )}

${validate_component(Modal, "Modal").$$render(
    $$result,
    {
      modal_id: "modal-read",
      modal_title: "Read Record on IneryDB by its ID"
    },
    {},
    {
      body: () => {
        return `<div slot="${"body"}" class="${"flex flex-col gap-4"}"><input type="${"text"}" placeholder="${"Type the ID..."}" class="${"input input-bordered w-full max-w-xs"}"${add_attribute("value", read_id, 0)}></div>`;
      }
    }
  )}

${validate_component(Modal, "Modal").$$render(
    $$result,
    {
      modal_id: "modal-update",
      modal_title: "Update Record on IneryDB by its ID"
    },
    {},
    {
      body: () => {
        return `<div slot="${"body"}" class="${"flex flex-col gap-4"}"><input type="${"text"}" placeholder="${"Type the ID..."}" class="${"input input-bordered w-full max-w-xs"}"${add_attribute("value", update_id, 0)}>
        <textarea class="${"textarea textarea-bordered w-full"}" placeholder="${"Type the data..."}">${""}</textarea></div>`;
      }
    }
  )}

${validate_component(Modal, "Modal").$$render(
    $$result,
    {
      modal_id: "modal-destroy",
      modal_title: "Destroy Record on IneryDB by its ID"
    },
    {},
    {
      body: () => {
        return `<div slot="${"body"}" class="${"flex flex-col gap-4"}"><input type="${"text"}" placeholder="${"Type the ID..."}" class="${"input input-bordered w-full max-w-xs"}"${add_attribute("value", destroy_id, 0)}></div>`;
      }
    }
  )}`;
});
export {
  Page as default
};
