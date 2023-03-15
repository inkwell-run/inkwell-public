import React, { useEffect, useState } from "react";
import { isHotkeyPressed } from "react-hotkeys-hook";

interface IUseMultiSelectProps<T> {
  // The items to select from
  items: T[];
  // A function to get the unique key from an item
  getKeyFromItem: (item: T) => string;
}

/**
 * A hook to manage multi-select
 * @param props - the props
 * @returns - the selected item keys and the toggle functions
 */
const useMultiSelect = <T,>(props: IUseMultiSelectProps<T>) => {
  const [selectedItemKeys, setSelectedItemKeys] = React.useState(
    new Set<string>()
  );
  const [mostRecentlySelectedKey, setMostRecentlySelectedKey] =
    React.useState<string>();
  const [localItems, setLocalItems] = useState<T[]>([]);

  // how the hook should update its state with new props
  useEffect(() => {
    // if none of the selected items are in the list, remove them
    const currentKeys = new Set(selectedItemKeys);
    const incomingKeys = new Set(
      props.items.map((it) => props.getKeyFromItem(it))
    );
    currentKeys.forEach((key) => {
      if (!incomingKeys.has(key)) {
        currentKeys.delete(key);
      }
    });
    setSelectedItemKeys(currentKeys);

    // if the most recently selected item is not in the list, remove it
    if (mostRecentlySelectedKey && !incomingKeys.has(mostRecentlySelectedKey)) {
      setMostRecentlySelectedKey(undefined);
    }

    // update local state
    setLocalItems(props.items);
  }, [props.items]);

  /**
   * Toggle an item
   * @param item - the item to toggle
   * @param override - "select" or "unselect"
   */
  const toggle = (item: T, override?: "select" | "unselect") => {
    // some hackery to select multiple items
    // https://stackoverflow.com/questions/659508/how-can-i-shift-select-multiple-checkboxes-like-gmail
    if (isHotkeyPressed("shift") && mostRecentlySelectedKey) {
      const indexOfCurrentItem = localItems.findIndex(
        (it) => props.getKeyFromItem(it) === props.getKeyFromItem(item)
      );

      const indexOfPreviousClosestItem = localItems.findIndex(
        (it) => props.getKeyFromItem(it) === mostRecentlySelectedKey
      );

      if (indexOfPreviousClosestItem) {
        _toggleRange(
          localItems[indexOfPreviousClosestItem],
          localItems[indexOfCurrentItem],
          "select"
        );
      }
    } else {
      _toggleSingle(item, override);
    }
  };

  const toggleAll = (override?: "select" | "unselect") => {
    const copy = new Set(selectedItemKeys);
    localItems.forEach((item) => {
      toggleInPlace({
        selectedKeys: copy,
        getKeyFromItem: props.getKeyFromItem,
        item,
        override,
      });
    });
    setSelectedItemKeys(copy);
  };

  const _toggleSingle = (item: T, override?: "select" | "unselect") => {
    const copy = new Set(selectedItemKeys);
    const whatHappened = toggleInPlace({
      selectedKeys: copy,
      getKeyFromItem: props.getKeyFromItem,
      item,
      override,
    });
    setSelectedItemKeys(copy);
    if (whatHappened === "select") {
      setMostRecentlySelectedKey(props.getKeyFromItem(item));
    }
  };

  /**
   * Toggle a range of items
   * @param startItem - the first item in the range
   * @param endItem - the last item in the range
   */
  const _toggleRange = (
    firstItem: T,
    secondItem: T,
    override?: "select" | "unselect"
  ) => {
    const copy = new Set(selectedItemKeys);
    const firstItemKey = props.getKeyFromItem(firstItem);
    const secondItemKey = props.getKeyFromItem(secondItem);
    const firstItemIndex = localItems.findIndex(
      (item) => props.getKeyFromItem(item) === firstItemKey
    );
    const secondItemIndex = localItems.findIndex(
      (item) => props.getKeyFromItem(item) === secondItemKey
    );
    const leftIndex =
      firstItemIndex < secondItemIndex ? firstItemIndex : secondItemIndex;
    const rightIndex =
      firstItemIndex >= secondItemIndex ? firstItemIndex : secondItemIndex;

    const range = localItems.slice(leftIndex, rightIndex + 1);
    range.forEach((item) => {
      toggleInPlace({
        selectedKeys: copy,
        getKeyFromItem: props.getKeyFromItem,
        item,
        override,
      });
    });
    setSelectedItemKeys(copy);
  };

  const selectedItems = localItems.filter((item) =>
    selectedItemKeys.has(props.getKeyFromItem(item))
  );

  return {
    selectedItems,
    selectedItemKeys,
    toggle,
    toggleAll,
  };
};

export default useMultiSelect;

interface IToggleInPlaceProps<T> {
  // The selected keys to modify
  selectedKeys: Set<string>;
  // A function to get the unique key from an item
  getKeyFromItem: (item: T) => string;
  // The item to toggle
  item: T;
  // The override to use
  override?: "select" | "unselect";
}

/**
 * An internal function to toggle an item
 * @param props - the props
 * @returns - nothing, it modifies the selected keys
 */
const toggleInPlace = <T,>(
  props: IToggleInPlaceProps<T>
): "select" | "unselect" => {
  const { selectedKeys, getKeyFromItem, item, override } = props;
  let whatHappened: "select" | "unselect";
  const itemKey = getKeyFromItem(item);
  if (selectedKeys.has(itemKey)) {
    selectedKeys.delete(itemKey);
    whatHappened = "unselect";
  } else {
    selectedKeys.add(itemKey);
    whatHappened = "select";
  }
  if (override === "select") {
    selectedKeys.add(itemKey);
    whatHappened = "select";
  }
  if (override === "unselect") {
    selectedKeys.delete(itemKey);
    whatHappened = "unselect";
  }
  return whatHappened;
};
