import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Container, Layout } from '../components'

const Content = styled(Container)`
	.gr_grid_container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
		img {
			max-width: 100%;
		}
	}
`

const Columns = styled(Container)`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	grid-column-gap: 2vw;
	padding: 0;
	img {
		max-width: 100%;
	}
`

const AboutPage = ({ location }) => (
	<Layout pathname={location.pathname}>
		<Content type="text">
			<Columns>
				<div>
					<h1>About</h1>
					<p>
						Thanks for checking out my site.
						I'm a software engineer based in Seattle.
						If you are looking to hire an experienced front-end developer, please check out my <a href="/resume">resume</a> and feel free to <a href="/contact">contact me</a> any time.
						Outside work, I enjoy hiking, soccer, cooking, reading, and spending time with family.
					</p>
				</div>
				<div>
					<br />
					<img src="rockies.jpg" alt="Kyle and Kristin in the Rockies" />
				</div>
			</Columns>
			<h2>Recently Read</h2>

			<div id="gr_grid_widget_1558937354">
				<div className="gr_grid_container">
					<div className="gr_grid_book_container"><a title="It Doesn't Have to Be Crazy at Work" rel="nofollow"
						href="https://www.goodreads.com/book/show/38900866-it-doesn-t-have-to-be-crazy-at-work"><img
							alt="It Doesn't Have to Be Crazy at Work" border="0"
							src="https://images.gr-assets.com/books/1526057292m/38900866.jpg" /></a></div>
					<div className="gr_grid_book_container"><a title="The Glass Castle" rel="nofollow"
						href="https://www.goodreads.com/book/show/7445.The_Glass_Castle"><img alt="The Glass Castle" border="0"
							src="https://images.gr-assets.com/books/1523542886m/7445.jpg" /></a></div>
					<div className="gr_grid_book_container"><a title="The Shining (The Shining, #1)" rel="nofollow"
						href="https://www.goodreads.com/book/show/11588.The_Shining"><img alt="The Shining" border="0"
							src="https://images.gr-assets.com/books/1353277730m/11588.jpg" /></a></div>
					<div className="gr_grid_book_container"><a
						title="See America: A Celebration of Our National Parks & Treasured Sites" rel="nofollow"
						href="https://www.goodreads.com/book/show/26031172-see-america"><img
							alt="See America: A Celebration of Our National Parks & Treasured Sites" border="0"
							src="https://images.gr-assets.com/books/1474857567m/26031172.jpg" /></a></div>
					<div className="gr_grid_book_container"><a
						title="The World's Great Wonders: How They Were Made Why They Are Amazing" rel="nofollow"
						href="https://www.goodreads.com/book/show/19139528-the-world-s-great-wonders"><img
							alt="The World's Great Wonders: How They Were Made Why They Are Amazing" border="0"
							src="https://images.gr-assets.com/books/1390171534m/19139528.jpg" /></a></div>
					<div className="gr_grid_book_container"><a
						title="Barrel-Aged Stout and Selling Out: Goose Island, Anheuser-Busch, and How Craft Beer Became Big Business"
						rel="nofollow"
						href="https://www.goodreads.com/book/show/36258655-barrel-aged-stout-and-selling-out"><img
							alt="Barrel-Aged Stout and Selling Out: Goose Island, Anheuser-Busch, and How Craft Beer Became Big Business"
							border="0" src="https://images.gr-assets.com/books/1527530270m/36258655.jpg" /></a></div>
					<div className="gr_grid_book_container"><a title="Once and Future River: Reclaiming the Duwamish" rel="nofollow"
						href="https://www.goodreads.com/book/show/27781500-once-and-future-river"><img
							alt="Once and Future River: Reclaiming the Duwamish" border="0"
							src="https://images.gr-assets.com/books/1447621141m/27781500.jpg" /></a></div>
					<div className="gr_grid_book_container"><a title="Cadillac Desert: The American West and Its Disappearing Water"
						rel="nofollow" href="https://www.goodreads.com/book/show/56140.Cadillac_Desert"><img
							alt="Cadillac Desert: The American West and Its Disappearing Water" border="0"
							src="https://images.gr-assets.com/books/1388189076m/56140.jpg" /></a></div>
					<div className="gr_grid_book_container"><a title="Walking with God through Pain and Suffering" rel="nofollow"
						href="https://www.goodreads.com/book/show/17674979-walking-with-god-through-pain-and-suffering"><img
							alt="Walking with God through Pain and Suffering" border="0"
							src="https://images.gr-assets.com/books/1364850855m/17674979.jpg" /></a></div>
					<div className="gr_grid_book_container"><a title="The Undoing Project: A Friendship That Changed Our Minds"
						rel="nofollow" href="https://www.goodreads.com/book/show/35631386-the-undoing-project"><img
							alt="The Undoing Project: A Friendship That Changed Our Minds" border="0"
							src="https://images.gr-assets.com/books/1509135882m/35631386.jpg" /></a></div>
				</div>

			</div>
			<div id="gr_grid_widget_1558937354"></div>
			<script
				src="https://www.goodreads.com/review/grid_widget/63515611.Kyle's%20bookshelf:%20read?cover_size=medium&hide_link=&hide_title=&num_books=10&order=d&shelf=read&sort=date_read&widget_id=1558937354"
				type="text/javascript"></script>
	</Content>
  </Layout>
		)
		
export default AboutPage
		
AboutPage.propTypes = {
	location: PropTypes.object.isRequired,
}
