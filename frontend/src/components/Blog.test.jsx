import { render, screen, cleanup } from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('Bloglist', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders the bloglist with only title visible', () => {
    const blog = {
      title: 'test title',
      url: 'test url',
      likes: 0,
      author: 'test author'
    }
    const sampleUser = {
      id: 'test id'
    }

    const mockHandler = vi.fn()

    render(
      <Blog blog={blog} user={sampleUser} setBlogs={mockHandler} />
    )
    const title = screen.getByText('test title')
    const url = screen.getByText('test url')
    const likes = screen.getByText('0')
    const author = screen.getByText('test author')
    const viewButton = screen.getByText('view')

    expect(title).toBeInTheDocument()
    expect(title).toBeVisible()
    expect(url).toBeInTheDocument()
    expect(url).not.toBeVisible()
    expect(likes).toBeInTheDocument()
    expect(author).toBeInTheDocument()
    expect(viewButton).toBeInTheDocument()

    screen.debug()
  })

  test('renders the bloglist with all details visible', async () => {
    const blog = {
      title: 'test title',
      url: 'test url',
      likes: 0,
      author: 'test author'
    }
    const sampleUser = {
      id: 'test id'
    }
    const mockHandler = vi.fn()
    
    render(
      <Blog blog={blog} user={sampleUser} setBlogs={mockHandler} />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(mockHandler.mock.calls).toHaveLength(0)
    const url = screen.getByText('test url')
    const likes = screen.getByText('0')
    const author = screen.getByText('test author')
    const hideButton = screen.getByText('hide')
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(author).toBeVisible()
    expect(hideButton).toBeInTheDocument()
    screen.debug()

  })

  // test('clicking the like button twice calls the event handler twice', async () => {
  //   const blog = {
  //     title: 'test title',
  //     url: 'test url',
  //     likes: 0,
  //     author: 'test author'
  //   }
  //   const sampleUser = {
  //     id: 'test id'
  //   }
  //   const mockHandler = vi.fn()

  //   render(
  //     <Blog blog={blog} user={sampleUser} setBlogs={mockHandler} />
  //   ) 

  //   const user = userEvent.setup()
  //   const viewButton = screen.getByText('view')
  //   await user.click(viewButton)
  //   const likeButton = screen.getByText('Like')
  //   await user.click(likeButton)
  //   await user.click(likeButton)

  //   expect(mockHandler.mock.calls).toHaveLength(2)

  // })
})
