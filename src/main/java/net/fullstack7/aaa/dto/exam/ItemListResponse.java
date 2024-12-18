package net.fullstack7.aaa.dto.exam;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemListResponse {
    private List<ItemInfo> itemList;
}