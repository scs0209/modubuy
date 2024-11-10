import type { ChangeEvent, InputHTMLAttributes, KeyboardEvent } from 'react'
import React, { memo, useCallback, useEffect, useState } from 'react'
import {
  Input,
  Icon,
  colorTokens,
  Dropdown,
  Stack,
  borderRadiusTokens,
  Menu,
  Text,
  IconButton,
} from '@shoplflow/base'
import { SearchIcon } from '@shoplflow/shopl-assets'
import styled from '@emotion/styled'
import { debounce } from 'lodash'

interface SearchType extends InputHTMLAttributes<HTMLInputElement> {
  width?: string
  height?: string
  /* 실시간 검색 사용 여부 */
  type?: 'default' | 'real-time'
  icon?: React.ReactNode
  onClear?: () => void
  /* 카테고리 여부 */
  category?: boolean
  dropdownItems?: Array<{ label: string; value: string }>
  selectedDropdownItem?: { label: string; value: string }
  onDropdownSelect?: (item: string) => void
  dropDownSizeVar?: 'S' | 'M'
  /* 엔터 및 아이콘 버튼 클릭 시 검색할 때 사용하는 props */
  onSearch?: (value: string) => void
  dropdownStyle?: React.CSSProperties
  inputStyle?: React.CSSProperties
}

const SearchBar = ({
  width = '100%',
  height = '40px',
  dropDownSizeVar = 'S',
  value,
  defaultValue,
  onChange,
  onClear,
  placeholder = '검색',
  icon = <Icon iconSource={SearchIcon} color="neutral350" sizeVar="S" />,
  type = 'default',

  /* 카테고리 props */
  category = false,
  dropdownItems = [],
  selectedDropdownItem,
  onDropdownSelect,
  onSearch,
  dropdownStyle,
  inputStyle,
}: SearchType) => {
  const [text, setText] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const convertToString = useCallback(
    (value: string | number | readonly string[]) => {
      if (typeof value !== 'number') {
        return typeof value === 'string' ? value : value.join('')
      }
      return String(value)
    },
    [],
  )

  const debouncedOnChange = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setText(newValue)
      if (type === 'real-time') {
        onChange && onChange(event)
        onSearch && onSearch(newValue)
      }
    }, 300),
    [onChange, onSearch, type],
  )

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(event)
  }

  const handleOnClear = () => {
    setText('')
    onClear && onClear()
  }

  // real-time 아닐 시 작동
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (type === 'default' && event.key === 'Enter') {
      onSearch && onSearch(text)
    }
  }

  // real-time 아닐 시 작동
  const handleIconClick = () => {
    if (type === 'default') {
      onSearch && onSearch(text)
    }
  }

  useEffect(() => {
    if (defaultValue !== undefined) {
      const convertString = convertToString(defaultValue)
      setText(convertString)
    }
  }, [convertToString, defaultValue])

  useEffect(() => {
    if (value !== undefined) {
      const convertString = convertToString(value)

      setText(convertString)
    }
  }, [convertToString, value])

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <StyledStackContainer
      width={width}
      height={height}
      spacing="spacing08"
      type={type}
      isOpen={isOpen}
    >
      {type === 'real-time' && icon}
      {category && (
        <Dropdown
          isOpen={isOpen}
          width="126px"
          trigger={
            <Dropdown.Button
              value={
                selectedDropdownItem && (
                  <Text typography="body1_400">
                    {selectedDropdownItem.label}
                  </Text>
                )
              }
              sizeVar={dropDownSizeVar}
              onClick={toggleOpen}
              style={{ ...dropdownStyle }}
            />
          }
          popper={
            <Dropdown.Content type="FILL">
              {dropdownItems.map((item) => (
                <Menu
                  key={item.value}
                  onClick={() => {
                    onDropdownSelect?.(item.label)
                    toggleOpen()
                  }}
                >
                  <Text typography="body1_500">{item.label}</Text>
                </Menu>
              ))}
            </Dropdown.Content>
          }
        />
      )}
      <Input
        placeholder={placeholder}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={text}
        style={{ ...inputStyle }}
        onClear={handleOnClear}
        width="100%"
      />
      {type === 'default' && (
        <IconButton styleVar="GHOST" sizeVar="S" onClick={handleIconClick}>
          <Icon
            iconSource={SearchIcon}
            color={text ? 'neutral700' : 'neutral350'}
            sizeVar="S"
          />
        </IconButton>
      )}
    </StyledStackContainer>
  )
}

export default memo(SearchBar)

const StyledStackContainer = styled(Stack.Horizontal)<{
  type?: 'default' | 'real-time'
  isOpen?: boolean
}>`
  border: 1px solid ${colorTokens.neutral100};
  border-radius: ${borderRadiusTokens.borderRadius06};
  background-color: ${colorTokens.neutral100};
  justify-content: center;
  align-items: center;
  padding: 4px 8px;

  ${({ type, isOpen }) =>
    type === 'real-time' &&
    `
    &:hover {
      background-color: ${colorTokens.neutral150};

      label {
        background-color: ${colorTokens.neutral150};
      }

      div[data-shoplflow="Dropdown"]{
        button {
          background-color: ${!isOpen && colorTokens.neutral150};
        }
      }
    }
  `}

  div[data-shoplflow="Dropdown"] {
    label {
      border: none;
      border-radius: 4px;
    }

    button {
      border-radius: 4px;
      background-color: ${({ isOpen }) =>
        isOpen ? colorTokens.neutral350 : colorTokens.neutral100};
    }
  }

  label[data-shoplflow='input'] {
    flex-grow: 1;
    border: none;
    height: 32px;
    background-color: transparent;

    div {
      padding: 0;
    }

    input {
      padding: 0 8px;
      background-color: transparent;
    }
  }
`
