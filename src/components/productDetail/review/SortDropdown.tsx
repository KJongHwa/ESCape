import React from 'react'
import { Dropdown } from 'flowbite-react'

interface SortDropdownProps {
  order: (sortOption: string) => void
  currentSortOption: string
}

const SortDropdown: React.FC<SortDropdownProps> = ({ order, currentSortOption }) => {
  const sortOptionLabels: { [key: string]: string } = {
    recent: '최신순',
    ratingDesc: '별점 높은순',
    ratingAsc: '별점 낮은순',
    likeCount: '좋아요순',
  }

  const handleSortChange = (sortOption: string) => {
    order(sortOption)
  }

  return (
    <div className="flex items-center gap-4">
      <Dropdown label={sortOptionLabels[currentSortOption]} inline>
        <Dropdown.Item onClick={() => handleSortChange('recent')}>최신순</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('ratingDesc')}>별점 높은순</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('ratingAsc')}>별점 낮은순</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange('likeCount')}>좋아요순</Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default SortDropdown
