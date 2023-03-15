import React from "react";
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

  /**
   * Toggle an item
   * @param item - the item to toggle
   * @param override - "select" or "unselect"
   */
  const toggle = (item: T, override?: "select" | "unselect") => {
    // some hackery to select multiple items
    // https://stackoverflow.com/questions/659508/how-can-i-shift-select-multiple-checkboxes-like-gmail
    if (isHotkeyPressed("shift") && mostRecentlySelectedKey) {
      const indexOfCurrentItem = props.items.findIndex(
        (it) => props.getKeyFromItem(it) === props.getKeyFromItem(item)
      );

      const indexOfPreviousClosestItem = props.items.findIndex(
        (it) => props.getKeyFromItem(it) === mostRecentlySelectedKey
      );

      if (indexOfPreviousClosestItem) {
        _toggleRange(
          props.items[indexOfPreviousClosestItem],
          props.items[indexOfCurrentItem],
          "select"
        );
      }
    } else {
      _toggleSingle(item, override);
    }
  };

  const _toggleSingle = (item: T, override?: "select" | "unselect") => {
    const copy = new Set(selectedItemKeys);
    toggleInPlace({
      selectedKeys: copy,
      getKeyFromItem: props.getKeyFromItem,
      item,
      override,
    });
    setSelectedItemKeys(copy);
    setMostRecentlySelectedKey(props.getKeyFromItem(item));
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
    const firstItemIndex = props.items.findIndex(
      (item) => props.getKeyFromItem(item) === firstItemKey
    );
    const secondItemIndex = props.items.findIndex(
      (item) => props.getKeyFromItem(item) === secondItemKey
    );
    const leftIndex =
      firstItemIndex < secondItemIndex ? firstItemIndex : secondItemIndex;
    const rightIndex =
      firstItemIndex >= secondItemIndex ? firstItemIndex : secondItemIndex;

    const range = props.items.slice(leftIndex, rightIndex + 1);
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

  const selectedItems = props.items.filter((item) =>
    selectedItemKeys.has(props.getKeyFromItem(item))
  );

  return {
    selectedItems,
    selectedItemKeys,
    toggle,
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
const toggleInPlace = <T,>(props: IToggleInPlaceProps<T>) => {
  const { selectedKeys, getKeyFromItem, item, override } = props;
  const itemKey = getKeyFromItem(item);
  if (selectedKeys.has(itemKey)) {
    selectedKeys.delete(itemKey);
  } else {
    selectedKeys.add(itemKey);
  }
  if (override === "select") {
    selectedKeys.add(itemKey);
  }
  if (override === "unselect") {
    selectedKeys.delete(itemKey);
  }
};
