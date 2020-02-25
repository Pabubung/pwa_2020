import styled from 'styled-components';
import { palette } from 'styled-theme';
import InputSearch from '../../../src/components/uielements/inputSearch';
import Papersheet from '../../../src/components/utility/papersheet';
import { InputLabel as InputLabels } from '../../../src/components/uielements/input';
import { FormControl as FormControls } from '../../../src/components/uielements/form';

const InputLabel = styled(InputLabels)``;
const InputFullWidth = styled(InputSearch)`
	width: 100%;
`;
const FormControl = styled(FormControls)`
	width: 100%;
`;
const Root = styled(Papersheet)`
	.GithubSearchResult {
		margin-top: 0;

		p {
			&.TotalRepository {
				margin-top: 0;
				border-bottom: 1px solid ${palette('grey', 3)};

				span {
					font-size: 16px;
					font-weight: 500;
					color: ${palette('grey', 9)};
				}
			}
		}

		.SingleRepository {
			.titleAndLanguage {
				h3 {
					font-weight: 500;
					margin-top: 0;
					margin-bottom: 0;
					a {
						text-decoration: none;
						font-weight: 500;
						cursor: pointer;
					}
				}

				span.language {
					&:before {
						background-color: ${palette('grey', 8)};
					}
					color: ${palette('grey', 8)};
				}

				span.totalStars {
					&:before {
						color: ${palette('grey', 8)};
					}
					color: ${palette('grey', 8)};
				}
			}

			p {
				color: ${palette('grey', 7)};
				margin-top: 20px;
			}

			span.updateDate {
				color: ${palette('grey', 6)};
			}
		}

		.githubSearchPagination {
			ul.rc-pagination {
				list-style: none;
				margin: 0;
				padding: 0;
				display: -webkit-inline-box;
				display: -ms-inline-flexbox;
				display: inline-flex;

				li {
					display: inline-block;
					margin: 0 5px;

					a {
						outline: none;
						width: 25px;
						height: 30px;
						display: block;
						text-align: center;
						line-height: 30px;
						color: ${palette('grey', 8)};
						font-weight: 500;
						cursor: pointer;
						border-radius: 3px;
					}

					&:hover {
						a {
							background-color: rgba(63, 81, 181, 0.12);
							color: ${palette('indigo', 5)};
						}
					}

					&.rc-pagination-item-active {
						a {
							color: ${palette('indigo', 5)};
						}
					}

					&.rc-pagination-prev {
						a {
							&:before {
								content: '⟵';
							}

							&:hover {
								background-color: transparent;
							}
						}
					}

					&.rc-pagination-next {
						a {
							&:before {
								content: '⟶';
							}

							&:hover {
								background-color: transparent;
							}
						}
					}

					&.rc-pagination-jump-next,
					&.rc-pagination-jump-prev {
						a {
							&:before {
								content: '…';
								font-size: 27px;
								margin-top: -15px;
								margin-top: -8px;
								position: absolute;
								margin-left: -8px;
							}

							&:hover {
								background-color: transparent;
							}
						}
					}
				}
			}
		}
	}
`;

export { Root, InputFullWidth, InputLabel, FormControl };
