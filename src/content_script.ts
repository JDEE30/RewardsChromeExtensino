import { messenger } from "@services/core/messanger";

/**
 * Listen to messages from background script.
 */
messenger.addListener(({type, payload}) => {
  switch (type) {

  }
});
